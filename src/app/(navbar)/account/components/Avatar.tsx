import { Input } from '@components/ui/Input';
import { type User } from '@models';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePictureUploader({
  user,
  onUpload,
}: {
  user: User;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `${fileName}`; // Make sure to include the "public" folder if needed

    // Upload file using standard upload
    const { data, error } = await supabase.storage
      .from('avatars') // Replace 'avatars' with your bucket name
      .upload(filePath, file, {
        cacheControl: '3600', // Optional: Set cache control if needed
        upsert: true, // Optional: Set to true if you want to overwrite existing files
      });

    if (error) {
      console.error(error);
      toast.error('Fejl ved upload af billede');
      setUploading(false);
      return;
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (publicUrlData) {
      const publicUrl = publicUrlData.publicUrl;
      onUpload(publicUrl); // Update the profile picture URL in state
      toast.success('Profilbillede opdateret!');
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
