import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers =  {
        Query: {
            hello: () => {
                return "Hello World!"; 
            },
            getListArticle: async () => {
                const articles = await Article.find({
                    deleted: false
                });

                return articles;
            },
            getArticle: async (_: any, args: any) => {
                const { id } = args;

                const article = await Article.findById({
                    _id: id,
                    deleted: false
                })
                
                return article;
            },
            getListCategory: async () => {
                const articles = await Article.find({
                    deleted: false
                });

                return articles;
            },
            getCategory: async (_: any, args: any) => {
                const { id } = args;

                const category = await Category.findById({
                    _id: id,
                    deleted: false
                })
                
                return category;
            }
        },
        Article: {
            category: async (article: any) => {
                const categoryId = article.categoryId;
                const category = await Category.findOne({
                    _id: categoryId
                })

                return category;
            }
        },
        Mutation: {
            createArticle: async (_: any, args: any) => {
                const { article } = args;

                const record = new Article(article);
                await record.save();

                return record;
            },
            deleteArticle: async (_: any, args: any) => {
                const { id } = args;

                await Article.updateOne({
                    _id: id
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });

                return "Đã xóa thành công bài viết!!"
            },
            updateArticle: async (_: any, args: any) => {
                const { id, article } = args;

                await Article.updateOne({
                    _id: id,
                    deleted: false
                }, article);

                const record = await Article.findOne({
                    _id: id
                });


                return record;
            },
            createCategory: async (_: any, args: any) => {
                const { category } = args;

                const record = new Category(category);
                await record.save();

                return record;
            },
            deleteCategory: async (_: any, args: any) => {
                const { id } = args;

                await Category.updateOne({
                    _id: id
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });

                return "Đã xóa thành công danh mục!!"
            },
            updateCategory: async (_: any, args: any) => {
                const { id, category } = args;

                await Category.updateOne({
                    _id: id,
                    deleted: false
                }, category);

                const record = await Category.findOne({
                    _id: id 
                });

                return record;
            }
        }
    };