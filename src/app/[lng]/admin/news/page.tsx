"use client";
import { useEffect, useState } from "react";
import { useT } from "@/app/i18n/client";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getAllNews } from "@/query/new/get-all-new";
import { editNew } from "@/query/new/edit-new";
import { createNew } from "@/query/new/create-new";
import { deleteNew } from "@/query/new/delete-new";
import AdminFormModal from "@/components/admin-form-modal";
import { uploadImage } from "@/query/upload";

interface News {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl: string;
  createdAt: string;
}

export default function NewsManagementPage() {
  const { t, i18n } = useT("adminNews");
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    contentAr: "",
    contentEn: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await getAllNews();
      if (response.success) {
        setNewsList(response.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (file: File) => {
    setUploadingImage(true);
    try {
      // Upload file to server and get the URL 
      const result = await uploadImage(file);
      
      if (result.success && result.url) {
        setFormData({ ...formData, imageUrl: result.url });
      } else {
        alert(i18n.language === "ar" 
          ? result.messageAr ?? "فشل رفع الصورة" 
          : result.messageEn ?? "Failed to upload image"
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(i18n.language === "ar" ? "فشل رفع الصورة" : "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenModal = (news?: News) => {
    if (news) {
      setEditingNews(news);
      setFormData({
        titleAr: news.titleAr,
        titleEn: news.titleEn,
        contentAr: news.contentAr,
        contentEn: news.contentEn,
        imageUrl: news.imageUrl,
      });
    } else {
      setEditingNews(null);
      setFormData({
        titleAr: "",
        titleEn: "",
        contentAr: "",
        contentEn: "",
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({
      titleAr: "",
      titleEn: "",
      contentAr: "",
      contentEn: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let result;
      if (editingNews) {
        // Update existing news
        result = await editNew(editingNews.id, formData);
      } else {
        // Create new news
        result = await createNew(formData);
      }

      if (result.success) {
        handleCloseModal();
        fetchNews();
      } else {
        alert(i18n.language === "ar" ? result.messageAr : result.messageEn);
      }
    } catch (error) {
      console.error("Error submitting news:", error);
      alert(t("error"));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeletingNewsId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingNewsId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNewsId) return;

    try {
      const result = await deleteNew(deletingNewsId);

      if (result.success) {
        handleCloseDeleteModal();
        fetchNews();
      } else {
        alert(i18n.language === "ar" ? result.messageAr : result.messageEn);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert(t("error"));
    }
  };

  return (
    <div className="xl:w-9/12 lg:w-10/12 md:w-11/12 w-full mx-auto px-6 py-8" dir={direction}>
      <div className="flex items-center w-full justify-between mt-10 mb-4">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          {t("title")}
        </h1>

        {/* Add New Button */}
        <div className="flex justify-center">
          <button
            onClick={() => handleOpenModal()}
            className="bg-primary hover:bg-primary/90 cursor-pointer md:text-[1rem] text-[0.9rem] text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            {t("addNew")}
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold text-gold mb-4 pb-4 border-b border-gray-200">
          {t("publishedNews")}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-8">{t("loading")}</p>
        ) : newsList.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t("noNews")}</p>
        ) : (
          <div className="space-y-4">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {news.imageUrl && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={news.imageUrl}
                        alt="News Image"
                        fill
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="md:text-xl font-medium text-gray-800">
                      {i18n.language === "ar" ? news.titleAr : news.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-2 font-medium">
                  <button
                    onClick={() => handleOpenModal(news)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="hidden md:block">{t("edit")}</span>
                    <PencilIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(news.id)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 text-red-600 bg-red-600/5 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <span className="hidden md:block">{t("delete")}</span>
                    <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AdminFormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editingNews ? t("edit") : t("addNew")}
        direction={direction}
        cancelText={t("cancel")}
        submitText={editingNews ? t("save") : t("create")}
        fields={[
          {
            name: "titleAr",
            label: t("titleAr"),
            value: formData.titleAr,
            onChange: (value) => setFormData({ ...formData, titleAr: value }),
            type: "text",
            direction: "rtl",
          },
          {
            name: "titleEn",
            label: t("titleEn"),
            value: formData.titleEn,
            onChange: (value) => setFormData({ ...formData, titleEn: value }),
            type: "text",
            direction: "ltr",
          },
          {
            name: "contentAr",
            label: t("contentAr"),
            value: formData.contentAr,
            onChange: (value) => setFormData({ ...formData, contentAr: value }),
            type: "textarea",
            direction: "rtl",
            rows: 6,
          },
          {
            name: "contentEn",
            label: t("contentEn"),
            value: formData.contentEn,
            onChange: (value) => setFormData({ ...formData, contentEn: value }),
            type: "textarea",
            direction: "ltr",
            rows: 6,
          },
          {
            name: "imageUrl",
            label: t("imageUrl"),
            value: formData.imageUrl,
            onChange: (value) => setFormData({ ...formData, imageUrl: value }),
            type: "file",
            direction: "ltr",
            accept: "image/png, image/jpeg, image/jpg, image/webp",
            onFileChange: handleFileChange,
            required: !editingNews,
            uploadText: uploadingImage 
              ? (i18n.language === "ar" ? "جاري الرفع..." : "Uploading...") 
              : (i18n.language === "ar" ? "انقر لتحميل الصورة" : "Click to upload image"),
            uploadSubText: "PNG, JPG, JPEG, WEBP",
            uploading: uploadingImage,
          },
        ]}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-80 p-6">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border-5 border-gold">
            <h2 className="md:text-2xl font-medium text-primary mb-10" dir={direction}>
              {t("confirmDelete")}
            </h2>
            <div className="flex gap-4 font-medium" dir={direction}>
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="flex-1 px-6 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-2 cursor-pointer bg-red-600/10 text-red-600 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-300"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
