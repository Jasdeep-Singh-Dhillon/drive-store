import { db } from "~/server/db";
import {
  files as FileSchema,
  folders as FolderSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone() {
  const files = await db
    .select()
    .from(FileSchema)
    .where(eq(FileSchema.parent, 1));
  const folders = await db
    .select()
    .from(FolderSchema)
    .where(eq(FolderSchema.parent, 1));
  return <DriveContents files={files} folders={folders} />;
}
