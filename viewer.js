const snoowrap = require("snoowrap");
const { readline } = require("./lib");

const r = new snoowrap({
  userAgent: "node:demo-ucll:v1.0.0",
  clientId: "KvFr4dOwtDDriw",
  clientSecret: "D03_UYvqKzJtPIKRmtWM7jtd5-4",
  username: "PrizeLingonberry",
  password: "demoucll"
});

(async () => {
  const hotsubmissions = await r.getHot();

  const titles = hotsubmissions.map((post, idx) => `[${idx}] ${post.title}`);

  for (const title of titles) {
    console.log(title);
  }

  console.log("\n");
  const id = await readline("What post do you want to see the comments for? ");
  const chosen = hotsubmissions[id];

  console.log("\n");
  if (chosen == undefined) {
    throw new Error("Could not get post with the given id" + id);
  }

  // We currently only get 1 in the depth. In the real world reddit comments are a tree structure,
  // But that is a lot harder to actually print to the console
  const submission = await r
    .getSubmission(chosen.id)
    .expandReplies({ limit: 10, depth: 1 });
  const comments = submission.comments.map(comment => comment.body);

  for (const comment of comments) {
    console.log(comment);
    console.log("=============");
  }
})()
  .then(_ => console.log("done"))
  .catch(console.error);