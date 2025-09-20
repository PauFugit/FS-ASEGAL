// lib/uploadUtils.js
export const uploadToSupabase = async (file, bucketName = 'blog-images') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucketName);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error uploading file');
    }

    const data = await response.json();
    
    if (!data.url) {
      throw new Error('No se recibió URL del servidor');
    }
    
    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Error uploading file');
  }
};

export const validateFile = (file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']) => {
  if (!file) return { valid: false, error: 'No file selected' };
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` };
  }
  
  return { valid: true, error: null };
};

// Función específica para upload de avatares de usuario
export const uploadUserAvatar = async (file) => {
  return uploadToSupabase(file, 'user-avatars');
};