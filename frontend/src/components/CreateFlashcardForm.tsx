import React, { useState } from 'react';
import { CreateFlashcardRequest } from '../types';
import { api } from '../services/api';

interface CreateFlashcardFormProps {
  deckId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateFlashcardForm: React.FC<CreateFlashcardFormProps> = ({ deckId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<CreateFlashcardRequest>({
    question: '',
    answer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Both question and answer are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const submitData = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
      };

      await api.createFlashcard(deckId, submitData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create flashcard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Flashcard</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Question *
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the question"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
              Answer *
            </label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter the answer"
              disabled={loading}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              disabled={loading || !formData.question.trim() || !formData.answer.trim()}
            >
              {loading ? 'Adding...' : 'Add Flashcard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcardForm;
