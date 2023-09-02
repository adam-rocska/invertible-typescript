export type Init<Tuple extends any[]> = Tuple extends [...infer Init, any] ? Init : [];

/**
 *If you might ask, why the shitty name?
  I asked the AI and this is what it told me.
  I had no better idea.

 * ==============================

 * The head of a linked list is usually the first node or element in the list. In functional programming, a linked list is often represented as a pair of the head and the tail, where the tail is the rest of the list. For example, in Haskell, a list can be defined as:
 *
 * data List a = Nil | Cons a (List a)
 *
 * where Nil is the empty list, and Cons is a constructor that takes a value (the head) and another list (the tail). For example, the list [1, 2, 3] can be written as:
 *
 * Cons 1 (Cons 2 (Cons 3 Nil))
 *
 * The head of this list is 1, and the tail is Cons 2 (Cons 3 Nil).
 *
 * If the head is not a single element but everything up until the last one, then it is called the init of the list. For example, the init of [1, 2, 3] is [1, 2]. The init of a list can be obtained by removing the last element, which is called the last of the list. For example, the last of [1, 2, 3] is 3.
 *
 * There are some built-in functions in Haskell that can operate on the head, init, tail and last of a list. For example:
 *
 * head :: [a] -> a – returns the head of a list init :: [a] -> [a] – returns the init of a list tail :: [a] -> [a] – returns the tail of a list last :: [a] -> a – returns the last of a list
 *
 * For more information on functional programming and linked lists, you can check out these web pages: Monad (functional programming), Recursion (computer science), and What is the ‘head’ of a linked list?.
 */