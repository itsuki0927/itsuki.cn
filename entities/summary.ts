export type SiteSummary = {
  blog: number;
  tag: number;
  comment: number;
  guestbook: number;
  startTime: Date;
  reading: number;
  diffDay: number;
};

export type QuerySiteSummaryResponse = {
  summary: SiteSummary;
};
