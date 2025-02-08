import GoogleDriveClone from "~/components/google-drive-clone"

export default function FolderPage({ params }: { params: { id: string } }) {
  return <GoogleDriveClone folderId={params.id} />
}

