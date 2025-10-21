"use client";
import { useEffect, useState } from "react";
import { useT } from "@/app/i18n/client";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getAllBlogs } from "@/query/blog/get-all-blogs";
import { editBlog } from "@/query/blog/edit-blog";
import { createBlog } from "@/query/blog/create-blog";
import { deleteBlog } from "@/query/blog/delete-blog";
import AdminFormModal from "@/app/[lng]/admin/admin-form-modal";

interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  createdAt: string;
}

export default function ArticlesManagementPage() {
  const { t, i18n } = useT("adminArticles");
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    contentAr: "",
    contentEn: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getAllBlogs();
      if (response.success) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        titleAr: article.titleAr,
        titleEn: article.titleEn,
        contentAr: article.contentAr,
        contentEn: article.contentEn,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        titleAr: "",
        titleEn: "",
        contentAr: "",
        contentEn: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingArticle(null);
    setFormData({
      titleAr: "",
      titleEn: "",
      contentAr: "",
      contentEn: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let result;
      if (editingArticle) {
        // Update existing article
        result = await editBlog(editingArticle.id, formData);
      } else {
        // Create new article
        result = await createBlog(formData);
      }

      if (result.success) {
        handleCloseModal();
        fetchArticles();
      } else {
        alert(i18n.language === "ar" ? result.messageAr : result.messageEn);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      alert(t("error"));
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeletingArticleId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingArticleId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingArticleId) return;

    try {
      const result = await deleteBlog(deletingArticleId);

      if (result.success) {
        handleCloseDeleteModal();
        fetchArticles();
      } else {
        alert(i18n.language === "ar" ? result.messageAr : result.messageEn);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
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

      {/* Articles List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold text-gold mb-4 pb-4 border-b border-gray-200">
          {t("publishedArticles")}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-8">{t("loading")}</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t("noArticles")}</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="md:text-xl font-medium text-gray-800">
                    {i18n.language === "ar" ? article.titleAr : article.titleEn}
                  </h3>
                </div>
                <div className="flex gap-2 font-medium">
                  <button
                    onClick={() => handleOpenModal(article)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="hidden md:block">{t("edit")}</span>
                    <PencilIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(article.id)}
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
        title={editingArticle ? t("edit") : t("addNew")}
        direction={direction}
        cancelText={t("cancel")}
        submitText={editingArticle ? t("save") : t("create")}
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
