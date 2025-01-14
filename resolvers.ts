import Article from "./models/article.model";

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
            }
        }
    };