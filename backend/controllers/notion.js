const { Client } = require("@notionhq/client");
require("dotenv").config({ path: "../.env" });

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});
const databaseId = process.env.NOTION_DBID;

exports.addToNotionDatabase = async (userid, movieid, rating) => {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        movieId: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: movieid.toString(),
              },
            },
          ],
        },
        userId: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: userid.toString(),
              },
            },
          ],
        },
        rating: {
          type: "number",
          number: parseFloat(rating),
        },
      },
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const updateSQLDatabse = async ({ movieid, rating, userid }) => {
  try {
    await axios.patch("http://localhost:5000/api/users", {
      movieid,
      rating,
      userid,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDataFromNotionDatabase = async () => {
  try {
    const date = new Date(Date.now());
    date.setHours(date.getHours() - 1);
    const lastTime = new Date(date);
    const ratingUpdates = await notion.databases.query({
      database_id: databaseId,
      filter: {
        date: {
          after: lastTime.toISOString(),
        },
        property: "Last edited time",
      },
    });
    const ratings = ratingUpdates.results.map((result) => {
      rating: result.properties["rating"].number;
      user_id: result.properties["userId"].title[0].plain_text;
      movie_id: result.properties["movieId"].title[0].plain_text;
    });
    console.log(ratings);
    ratings.forEach((rating) => updateSQLDatabse(rating));
  } catch (err) {
    console.log(err);
  }
};
