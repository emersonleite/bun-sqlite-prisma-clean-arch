export default interface UseCase<E, S> {
  execute(entry: E): Promise<S>;
}
