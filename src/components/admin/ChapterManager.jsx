// src/components/admin/ChapterManager.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Save, X, Link, FileText, Video, BookOpen } from 'lucide-react';

// -------------------- validators --------------------
const isValidGoogleDriveLink = (url) => {
  if (!url) return true; // allow empty
  const pattern =
    /(drive\.google\.com|docs\.google\.com)\/(file\/d\/|drive\/folders\/|open\?id=|spreadsheets\/d\/|document\/d\/|presentation\/d\/)/;
  return pattern.test(url);
};

const isValidYouTubeLink = (url) => {
  if (!url) return true; // allow empty
  const pattern =
    /(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|shorts\/|playlist\?|[A-Za-z0-9_-]{11})/;
  return pattern.test(url);
};

// =====================================================
const ChapterManager = ({
  chapter = null,
  onSave = () => {},
  onCancel = () => {},
  title = 'Manage Chapter',
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    notesLink: '',
    dppLink: '',
    lectureLink: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { darkMode } = useTheme();

  // -------- fill data if editing ----------
  useEffect(() => {
    if (chapter) {
      setFormData({
        title: chapter.title || '',
        description: chapter.description || '',
        subject: chapter.subject || 'Mathematics',
        notesLink: chapter.notesLink || '',
        dppLink: chapter.dppLink || '',
        lectureLink: chapter.lectureLink || '',
        isActive:
          chapter.isActive !== undefined ? chapter.isActive : true,
      });
    }
  }, [chapter]);

  // ---------- validation ----------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';

    if (formData.notesLink && !isValidGoogleDriveLink(formData.notesLink))
      newErrors.notesLink = 'Please enter a valid Google Drive link';

    if (formData.dppLink && !isValidGoogleDriveLink(formData.dppLink))
      newErrors.dppLink = 'Please enter a valid Google Drive link';

    if (formData.lectureLink && !isValidYouTubeLink(formData.lectureLink))
      newErrors.lectureLink = 'Please enter a valid YouTube link';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- input change ----------
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    try {
      await onSave(formData);
    } catch (err) {
      console.error('Error saving chapter:', err);
    } finally {
      setSaving(false);
    }
  };

  // ---------- input field component ----------
  const InputField = ({
    label,
    field,
    type = 'text',
    placeholder,
    icon: Icon,
    required = false,
  }) => (
    <div className="mb-4">
      <label
        htmlFor={field}
        className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>

      {type === 'textarea' ? (
        <textarea
          id={field}
          value={formData[field]}
          onChange={e => {
            const newValue = e.target.value;
            setFormData(prev => ({
              ...prev,
              [field]: newValue
            }));
            if (errors[field]) {
              setErrors(prev => ({ ...prev, [field]: '' }));
            }
          }}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[field]
              ? 'border-red-500'
              : darkMode
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
      ) : type === 'select' ? (
        <select
          id={field}
          value={formData[field] || 'Mathematics'}
          onChange={e => {
            const newValue = e.target.value;
            setFormData(prev => ({
              ...prev,
              [field]: newValue
            }));
            if (errors[field]) {
              setErrors(prev => ({ ...prev, [field]: '' }));
            }
          }}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[field]
              ? 'border-red-500'
              : darkMode
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-gray-900'
          }`}
        >
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="Social Science">Social Science</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      ) : (
        <input
          id={field}
          type={type}
          value={formData[field]}
          onChange={e => {
            const newValue = e.target.value;
            setFormData(prev => ({
              ...prev,
              [field]: newValue
            }));
            if (errors[field]) {
              setErrors(prev => ({ ...prev, [field]: '' }));
            }
          }}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[field]
              ? 'border-red-500'
              : darkMode
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300 bg-white text-gray-900'
          }`}
        />
      )}

      {errors[field] && (
        <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  // ------------------- JSX -------------------
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          type="button"
          onClick={onCancel}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Chapter Title"
            field="title"
            placeholder="Enter chapter title"
            icon={BookOpen}
            required
          />

          <InputField
            label="Subject"
            field="subject"
            type="select"
            icon={BookOpen}
          />
        </div>

        <InputField
          label="Description"
          field="description"
          type="textarea"
          placeholder="Brief description of the chapter"
          icon={FileText}
          required
        />

        <InputField
          label="Notes Link (Google Drive)"
          field="notesLink"
          placeholder="https://drive.google.com/file/d/..."
          icon={Link}
        />

        <InputField
          label="DPP Link (Google Drive)"
          field="dppLink"
          placeholder="https://drive.google.com/file/d/..."
          icon={Link}
        />

        <InputField
          label="Lecture Link (YouTube)"
          field="lectureLink"
          placeholder="https://www.youtube.com/watch?v=..."
          icon={Video}
        />

        {/* Active Status */}
        <div className="flex items-center space-x-3">
          <input
            id="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              handleInputChange('isActive', e.target.checked)
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isActive"
            className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Chapter is active (visible to students)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Chapter'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChapterManager;
