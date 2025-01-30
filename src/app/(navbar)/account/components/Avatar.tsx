'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/Input';
import toast from 'react-hot-toast';

export default function ProfilePictureUploader({ user, onUpload }: { user: any, onUpload: (url: string) => void }) {
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload image to Supabase Storage
    const { error } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (error) {
      console.error(error);
      toast.error('Fejl ved upload af billede');
      setUploading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    if (data) {
      onUpload(data.publicUrl); // Update profile picture in state
      toast.success('Profilbillede opdateret!');
    }
    
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input type="file" accept="image/*" onChange={uploadImage} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
