'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Loader } from '@/components/Loader/Loader';
import { getForms, updateForm, deleteForm } from '@/lib/mutations';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Form {
  id: number;
  title: string;
  schema_json: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSchema, setNewSchema] = useState('');

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }
    fetchForms();
  }, [user, token, router]);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const data = await getForms(token!);
      setForms(data);
    } catch (err) {
      console.error('Fetch forms failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (form: Form) => {
    setSelectedForm(form);
    setNewTitle(form.title);
    setNewSchema(form.schema_json);
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedForm || !token) return;
    setLoading(true);
    try {
      await updateForm(token, selectedForm.id, newTitle, newSchema);
      setEditDialogOpen(false);
      fetchForms();
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (form: Form) => {
    setSelectedForm(form);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedForm || !token) return;
    setLoading(true);
    try {
      await deleteForm(token, selectedForm.id);
      setDeleteDialogOpen(false);
      fetchForms();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email: string) => email.charAt(0).toUpperCase();

  const columns: ColumnDef<Form>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Title' },
    {
      id: 'avatar',
      header: 'User',
      cell: () => (
        <div className={styles.avatar}>
          {user ? getInitials(user.email) : ''}
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className={styles.actions}>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original)}>Delete</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: forms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!user || loading) return <Loader text="Loading Dashboard..." />;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome, {user.email}</h1>
        <div className={styles.info}>
          <p>Role: {user.role}</p>
          <p>Credits: {user.credits}</p>
          <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Your Forms</h2>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <a href="/create-form" className={styles.button}>
            Create New Form
          </a>
        </div>
      </div>

      {/* Edit Dialog */}
      {editDialogOpen && (
        <div className={styles.dialog}>
          <div className={styles.dialogContent}>
            <h3>Edit Form</h3>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={newSchema}
              onChange={(e) => setNewSchema(e.target.value)}
              placeholder="Schema JSON"
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <div className={styles.dialog}>
          <div className={styles.dialogContent}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete &quot;{selectedForm?.title}&quot;?
            </p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setDeleteDialogOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
