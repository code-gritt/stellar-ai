'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  createForm,
  updateForm,
  suggestSchema,
  getForm,
} from '@/lib/mutations';
import { Loader } from '@/components/Loader/Loader';
import styles from './CreateForm.module.css';

// ---------------- Types ----------------
interface Field {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: string[];
  pattern?: string;
}

interface FormData {
  title: string;
  description: string;
  schema: Field[];
}

// ---------------- Component ----------------
export default function CreateFormPage({ formId }: { formId?: string }) {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { title: '', description: '', schema: [] },
  });

  const [schema, setSchema] = useState<Field[]>([]);
  const title = watch('title');
  const description = watch('description');
  const sensors = useSensors(useSensor(PointerSensor));

  // Load form if editing
  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }
    if (formId) {
      setLoading(true);
      getForm(token, parseInt(formId))
        .then((form) => {
          setValue('title', form.title);
          setValue('description', ''); // DB has no description yet
          const schemaFields = JSON.parse(form.schema_json).fields || [];
          setSchema(schemaFields);
          setValue('schema', schemaFields);
        })
        .catch(() => setError('Failed to load form'))
        .finally(() => setLoading(false));
    }
  }, [user, token, formId, router, setValue]);

  // Handle AI Suggestion
  const handleAISuggest = async () => {
    if (!title) {
      setError('Enter a title to get AI suggestions');
      return;
    }
    setLoading(true);
    try {
      const suggestedSchema = await suggestSchema(title, description);
      const validatedSchema = suggestedSchema.fields.map((field, index) => ({
        ...field,
        id: field.id || `field-${index + 1}`,
        type: [
          'text',
          'number',
          'select',
          'checkbox',
          'radio',
          'date',
          'file',
        ].includes(field.type)
          ? field.type
          : 'text',
      }));
      setSchema(validatedSchema);
      setValue('schema', validatedSchema);
      setError('');
    } catch {
      setError('Failed to fetch AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  // Add, Update, Remove Fields
  const addField = (type: Field['type']) => {
    const newField: Field = {
      id: `field-${schema.length + 1}`,
      type,
      label: `Field ${schema.length + 1}`,
      required: false,
    };
    if (type === 'select' || type === 'radio')
      newField.options = ['Option 1', 'Option 2'];
    if (type === 'text') newField.pattern = '.*';
    setSchema([...schema, newField]);
    setValue('schema', [...schema, newField]);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    const updatedSchema = schema.map((field) =>
      field.id === id ? { ...field, ...updates } : field,
    );
    setSchema(updatedSchema);
    setValue('schema', updatedSchema);
  };

  const removeField = (id: string) => {
    const updatedSchema = schema.filter((field) => field.id !== id);
    setSchema(updatedSchema);
    setValue('schema', updatedSchema);
  };

  // Submit
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const schema_json = JSON.stringify({ fields: data.schema });
      if (formId) {
        await updateForm(token!, parseInt(formId), data.title, schema_json);
      } else {
        await createForm(token!, data.title, schema_json);
      }
      router.push('/dashboard?refetch=true');
    } catch {
      setError('Failed to save form');
    } finally {
      setLoading(false);
    }
  };

  // Sortable field component
  const SortableField = ({ field }: { field: Field }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: field.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={styles.field}
      >
        <input
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          placeholder="Field Label"
        />
        <select
          value={field.type}
          onChange={(e) =>
            updateField(field.id, { type: e.target.value as Field['type'] })
          }
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="date">Date</option>
          <option value="file">File</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) =>
              updateField(field.id, { required: e.target.checked })
            }
          />
          Required
        </label>
        {(field.type === 'select' || field.type === 'radio') && (
          <input
            value={field.options?.join(',') || ''}
            onChange={(e) =>
              updateField(field.id, {
                options: e.target.value.split(',').map((opt) => opt.trim()),
              })
            }
            placeholder="Options (comma-separated)"
          />
        )}
        {field.type === 'number' && (
          <>
            <input
              type="number"
              value={field.min || ''}
              onChange={(e) =>
                updateField(field.id, {
                  min: parseInt(e.target.value) || undefined,
                })
              }
              placeholder="Min"
            />
            <input
              type="number"
              value={field.max || ''}
              onChange={(e) =>
                updateField(field.id, {
                  max: parseInt(e.target.value) || undefined,
                })
              }
              placeholder="Max"
            />
          </>
        )}
        {field.type === 'text' && (
          <input
            value={field.pattern || ''}
            onChange={(e) =>
              updateField(field.id, { pattern: e.target.value || undefined })
            }
            placeholder="Regex Pattern (e.g., ^[a-zA-Z]+$)"
          />
        )}
        <button onClick={() => removeField(field.id)} className={styles.button}>
          Remove
        </button>
      </div>
    );
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = schema.findIndex(
      (field) => field.id === String(active.id),
    );
    const newIndex = schema.findIndex((field) => field.id === String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const newSchema = [...schema];
    const [moved] = newSchema.splice(oldIndex, 1);
    newSchema.splice(newIndex, 0, moved);

    setSchema(newSchema);
    setValue('schema', newSchema);
  };
  if (loading) return <Loader text="Loading Form Builder..." />;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {formId ? 'Edit Form' : 'Build AI Form'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Title */}
          <div className={styles.inputGroup}>
            <label>Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Form Title (e.g., Customer Feedback)"
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className={styles.inputGroup}>
            <label>Description (Optional)</label>
            <textarea
              {...register('description')}
              placeholder="Describe the form purpose for better AI suggestions"
            />
          </div>

          <button
            type="button"
            onClick={handleAISuggest}
            className={styles.button}
          >
            Get AI Suggestions (via Gemini)
          </button>

          {/* Drag & Drop Fields */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={schema.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {schema.map((field) => (
                <SortableField key={field.id} field={field} />
              ))}
            </SortableContext>
          </DndContext>

          {/* Add Fields */}
          <div className={styles.fieldTypes}>
            {[
              'text',
              'number',
              'select',
              'checkbox',
              'radio',
              'date',
              'file',
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addField(type as Field['type'])}
                className={styles.button}
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            {formId ? 'Update Form' : 'Save Form'}
          </button>
        </form>

        {/* Preview */}
        <div className={styles.preview}>
          <h2>Form Preview</h2>
          {schema.length === 0 && <p>No fields added yet.</p>}
          {schema.map((field) => (
            <div key={field.id} className={styles.previewField}>
              <label>
                {field.label}{' '}
                {field.required && <span className={styles.required}>*</span>}
              </label>
              {field.type === 'text' && (
                <input type="text" pattern={field.pattern} />
              )}
              {field.type === 'number' && (
                <input type="number" min={field.min} max={field.max} />
              )}
              {field.type === 'select' && (
                <select>
                  {field.options?.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {field.type === 'checkbox' && <input type="checkbox" />}
              {field.type === 'radio' && (
                <div>
                  {field.options?.map((opt) => (
                    <label key={opt} className={styles.radioLabel}>
                      <input type="radio" name={field.id} /> {opt}
                    </label>
                  ))}
                </div>
              )}
              {field.type === 'date' && <input type="date" />}
              {field.type === 'file' && <input type="file" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
