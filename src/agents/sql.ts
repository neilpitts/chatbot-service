import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { DataSource } from "typeorm";

/** Run the agent to do a db lookup */
export const run = async (input: string) => {
  // Get the command-line arguments
const args = process.argv.slice(2);

// Check if any arguments were provided
var query;
if (args.length === 0) {
  console.log('No arguments provided.');
} else {
  console.log('Arguments:');
  args.forEach((arg, index) => {
    console.log(`[${index}] ${arg}`);
    query = `${arg}`;
  });
}

  const datasource = new DataSource({
    type: "mysql",
    database: "paragonone",
    host: "dbdev.paragonone.com",
    username: "paragonone",
    password: "NzEK3Su1Uonb"
  });
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
    includesTables: ["student_applications", "users"],
  });

  // console.log(db)

  const key = "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";
  const model = new OpenAI({ temperature: 0, modelName: "gpt-4", openAIApiKey: key });
  const toolkit = new SqlToolkit(db, model);
  const executor = createSqlAgent(model, toolkit);

  // const input = `give me a user whose email address is success@paragonone.com.`;
  // const input = `what is the status of my application, my email address is success@paragonone.com?`;
  // const input = `Did you receive my application, my email address is success@paragonone.com?`;
  // const input = `Can you please check if my video interview has been submitted?, my email address is success@paragonone.com?`;
  // const input = `how much time do i have to submit my video?, my email address is success@paragonone.com?`;

  console.log(`Executing with input "${query}"...`);

  //const input = query;
  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );

  await datasource.destroy();

  return result.output;
};