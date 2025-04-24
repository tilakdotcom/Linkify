import { format } from "date-fns";

export const formatDate = (date: Date | string, dateFormat: string = "PPP") => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return format(date, dateFormat);
};
