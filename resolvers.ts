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
        }
    };