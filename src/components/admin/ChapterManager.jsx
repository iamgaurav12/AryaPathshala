// src/components/admin/ChapterManager.jsx
import React, { useState, useEffect } from 'react';
import { Save, X, Link, FileText, Video, BookOpen } from 'lucide-react';

// -------------------- validators --------------------
const isValidGoogleDriveLink = (url) => {
  if (!url) return true; // allow empty
  const pattern = /(drive\.google\.com|docs\.google\.com)\/(file\/d\/|drive\/folders\/|open\?id=|spreadsheets\/d\/|document\/d\/|presentation\/d\/)/;
  return pattern.test(url);
};

const isValidYouTubeLink = (url) => {
  if (!url) return true; // allow empty
  const pattern = /(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|shorts\/|playlist\?|[A-Za-z0-9_-]{11})/;
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
        isActive: chapter.isActive !== undefined ? chapter.isActive : true,
      });
    }
  }, [chapter]);

  // ---------- validation ----------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.notesLink && !isValidGoogleDriveLink(formData.notesLink)) newErrors.notesLink = 'Please enter a valid Google Drive link';
    if (formData.dppLink && !isValidGoogleDriveLink(formData.dppLink)) newErrors.dppLink = 'Please enter a valid Google Drive link';
    if (formData.lectureLink && !isValidYouTubeLink(formData.lectureLink)) newErrors.lectureLink = 'Please enter a valid YouTube link';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- input change ----------
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  const InputField = ({ label, field, type = 'text', placeholder, icon: Icon, required = false }) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium mb-2 text-gray-300">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-4 w-4 text-yellow-400" />}
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </div>
      </label>
      <div className="mt-1">
        {type === 'textarea' ? (
          <textarea
            id={field}
            value={formData[field]}
            onChange={e => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300 bg-black text-white placeholder-gray-500 ${errors[field] ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'}`}
          />
        ) : type === 'select' ? (
          <select
            id={field}
            value={formData[field]}
            onChange={e => handleInputChange(field, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300 bg-black text-white ${errors[field] ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'}`}
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
            onChange={e => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300 bg-black text-white placeholder-gray-500 ${errors[field] ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'}`}
          />
        )}
      </div>
      {errors[field] && <p className="mt-1 text-sm text-red-400 bg-red-900/20 px-2 py-1 rounded">{errors[field]}</p>}
    </div>
  );

  // ------------------- JSX -------------------
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button type="button" onClick={onCancel} className="p-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Chapter Title" field="title" placeholder="Enter chapter title" icon={BookOpen} required />
          <InputField label="Subject" field="subject" type="select" icon={BookOpen} />
        </div>
        <InputField label="Description" field="description" type="textarea" placeholder="Brief description of the chapter" icon={FileText} required />
        <InputField label="Notes Link (Google Drive)" field="notesLink" placeholder="https://drive.google.com/file/d/..." icon={Link} />
        <InputField label="DPP Link (Google Drive)" field="dppLink" placeholder="https://drive.google.com/file/d/..." icon={Link} />
        <InputField label="Lecture Link (YouTube)" field="lectureLink" placeholder="https://www.youtube.com/watch?v=..." icon={Video} />

        <div className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gray-800">
          <input id="isActive" type="checkbox" checked={formData.isActive} onChange={(e) => handleInputChange('isActive', e.target.checked)} className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-600 rounded bg-gray-800 accent-yellow-500" />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-300">Chapter is active (visible to students)</label>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-800">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-all duration-300" disabled={saving}>Cancel</button>
          <button type="submit" disabled={saving} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50">
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Chapter'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChapterManager;
