import { useState } from "react";

export const UseExecuter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const executer = async (execute: () => Promise<void>) => {
    setError(``);
    setLoading(true);
    await execute().catch((e) => {
      setError(`${e}`);
    });
    setLoading(false);
  };
  return {
    loading,
    error,
    executer,
  };
};
