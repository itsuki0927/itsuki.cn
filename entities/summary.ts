export type SiteSummary = {
  article: number;
  tag: number;
  comment: number;
  guestbook: number;
  startTime: Date;
};

export type QuerySiteSummaryResponse = {
  summary: SiteSummary;
};
