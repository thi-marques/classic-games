type PartialProps<T, P extends keyof T> = Partial<Pick<T, P>> & Omit<T, P>
type RequiredProps<T, P extends keyof T> = Required<Pick<T, P>> & Omit<T, P>
