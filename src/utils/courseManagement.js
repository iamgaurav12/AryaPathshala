import { createChapter, getChapters, getChapter, updateChapter } from '../firebase/collections';

export const addNewChapter = async (classLevel, chapterData) => {
  try {
    const chapterId = await createChapter(classLevel, {
      title: chapterData.title,
      description: chapterData.description,
      content: chapterData.content || '',
      links: chapterData.links || [],
      resources: chapterData.resources || [],
      order: chapterData.order || 0
    });
    return chapterId;
  } catch (error) {
    console.error('Error adding chapter:', error);
    throw error;
  }
};

export const getAllChapters = async (classLevel) => {
  try {
    const chapters = await getChapters(classLevel);
    // Sort chapters by order
    return chapters.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error getting chapters:', error);
    throw error;
  }
};

export const getChapterDetails = async (classLevel, chapterId) => {
  try {
    return await getChapter(classLevel, chapterId);
  } catch (error) {
    console.error('Error getting chapter details:', error);
    throw error;
  }
};

export const updateChapterContent = async (classLevel, chapterId, updateData) => {
  try {
    await updateChapter(classLevel, chapterId, updateData);
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

// Sample chapter data structure
export const sampleChapterStructure = {
  title: 'Chapter Title',
  description: 'Brief description of the chapter',
  content: 'Main content/text of the chapter',
  links: [
    {
      title: 'Resource Title',
      url: 'https://example.com',
      type: 'video|document|link'
    }
  ],
  resources: [
    {
      title: 'Resource Title',
      description: 'Resource description',
      url: 'https://example.com',
      type: 'pdf|video|quiz'
    }
  ],
  order: 1 // For ordering chapters in the list
};