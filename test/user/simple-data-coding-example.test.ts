import {Invertible} from "@adam-rocska/invertible";
import {pipe} from "@adam-rocska/invertible/pipe";

test(`Simple arithmetics example`, async () => {
  const byteBase64Codec = Invertible<string, Uint8Array>(
    async (s: string) => Uint8Array.from(atob(s), (c) => c.codePointAt(0)!),
    async (a: Uint8Array) => btoa(String.fromCharCode(...a))
  );

  const stringByteCodec = Invertible(
    async (s: string) => new TextEncoder().encode(s),
    async (a: Uint8Array) => new TextDecoder().decode(a)
  );

  class User {constructor(public name: string, public age: number) {} }
  type UserTuple = readonly [name: string, age: number];

  const userTupleCodec = Invertible<User, UserTuple>(
    async (u: User) => [u.name, u.age] as const,
    async ([name, age]: readonly [string, number]) => new User(name, age)
  );

  const joinTuple = <T extends readonly any[]>(separator: string) => Invertible(
    async (v: T) => v.join(separator),
    async (s: string) => s.split(separator) as any as T
  );

  const userRpcMessage = pipe(userTupleCodec)
    .pipe(joinTuple(`|`))
    .pipe(stringByteCodec)
    .pipe(byteBase64Codec.inverse);

  const user = new User(`John Doe`, 42);
  const rpcMessage = await userRpcMessage(user);
  expect(rpcMessage).toBe(`Sm9obiBEb2V8NDI=`);
});