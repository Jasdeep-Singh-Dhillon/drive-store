"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Folder, File, Upload, ChevronRight, Moon, Sun } from "lucide-react"
import { Button } from "~/components/ui/button"

// Mock data
const mockData = {
  root: [
    { id: "1", name: "Documents", type: "folder" },
    { id: "4", name: "Images", type: "folder" },
    { id: "7", name: "Project.pdf", type: "file", url: "#" },
  ],
  "1": [
    { id: "2", name: "Report.docx", type: "file", url: "#" },
    { id: "3", name: "Budget.xlsx", type: "file", url: "#" },
  ],
  "4": [
    { id: "5", name: "Vacation.jpg", type: "file", url: "#" },
    { id: "6", name: "Family.png", type: "file", url: "#" },
  ],
}

const FileItem = ({ item }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      {item.type === "folder" ? (
        <Folder className="w-5 h-5 mr-2 text-blue-500" />
      ) : (
        <File className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
      )}
      {item.type === "file" ? (
        <a href={item.url} className="text-blue-600 dark:text-blue-400 hover:underline">
          {item.name}
        </a>
      ) : (
        <Link href={`/folder/${item.id}`} className="dark:text-white">
          {item.name}
        </Link>
      )}
    </div>
  )
}

export default function GoogleDriveClone({ folderId = "root" }) {
  const [data, setData] = useState(mockData[folderId] || [])
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: "root", name: "My Drive" }])
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    // Update breadcrumbs when folderId changes
    if (folderId !== "root") {
      const folderName = mockData.root.find((item) => item.id === folderId)?.name || "Unknown Folder"
      setBreadcrumbs([
        { id: "root", name: "My Drive" },
        { id: folderId, name: folderName },
      ])
    } else {
      setBreadcrumbs([{ id: "root", name: "My Drive" }])
    }
    setData(mockData[folderId] || [])
  }, [folderId])

  const handleUpload = () => {
    // Mock upload functionality
    const newFile = {
      id: String(Date.now()),
      name: `Uploaded-${Date.now()}.txt`,
      type: "file",
      url: "#",
    }
    setData([...data, newFile])
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Google Drive Clone</h1>
          <Button onClick={toggleDarkMode} variant="outline">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex items-center mb-4 space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              <Link href={item.id === "root" ? "/" : `/folder/${item.id}`} className="hover:underline">
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{breadcrumbs[breadcrumbs.length - 1].name}</h2>
          <Button onClick={handleUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
          {data.map((item) => (
            <FileItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

