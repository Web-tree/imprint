export interface Week {
    /**
     * Number of commits
     */
    c: number;
    /**
     * Number of deletions
     */
    d: number;
    /**
     * Number of additions
     */
    a: number;
    /**
     * Start of the week, given as a Unix timestamp.
     */
    w: number;
}
