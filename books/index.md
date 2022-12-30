---
title: Books
...

# Software engineering

- Software engineering in general:

  - [Andrew Hunt, David Thomas: The Pragmatic Programmer](http://books.google.com/books?id=5wBQEp6ruIAC)
  - [Michael C. Feathers: Working Effectively with Legacy Code](http://books.google.com/books?id=CQlRAAAAMAAJ)

<!---
Notes:
- not a unit test if: 1) talks to a db 2) network traffic 3) filesystem activity 4) special env needed
- wrapper around 3rd-party library is good, so 1) migration is easier later 2) testing is easier
- parameterize ctor: have 2 ctors, one that creates objects and one that allows passing in fakes
- interface naming: Log -> Recorder
- supersede instance variable -> works around the "can't call virt method from ctor" problem
-->

- C++ Programming:

  - [Scott Meyers: Effective C++](http://books.google.com/books?id=X5wZAQAAIAAJ)
  - [Scott Meyers: More Effective C++](http://books.google.com/books?id=azvE8V0c-mYC)
  - [Scott Meyers: Effective STL](http://books.google.com/books?id=RPnWe6QKnCcC)
  - [Scott Meyers: Effective Modern C++](http://books.google.com/books?id=ZDhIBQAAQBAJ)
  - [Anthony Williams: C++ Concurrency in Action](http://books.google.com/books?id=EttPPgAACAAJ)
  - [Modern CMake](https://cliutils.gitlab.io/modern-cmake/)

- Vimscript Programming:

  - [Steve Losh: Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)

- JavaScript Programming:

  - [Marijn Haverbeke: Eloquent JavaScript](http://books.google.com/books?id=UIv0rQEACAAJ)

- Rust Programming

  - [The Rust Programming language (2018 Edition)](https://doc.rust-lang.org/book/2018-edition/)

<!---
Notes:
- chapter 4: rust uses something like C++'s std::unique_ptr, i.e. it moves
  ownership on assignment + compile-time check for use-after-free
  - it also has references: can have at most 1 mutable and several const
    refs to avoid races + compile-time check for this
- chapter 6: `#[derive(Debug)]` and `{:?}` can pretty-print an enum
  automatically
- trait: Copy (value semantics), Drop (kind of an interface)
- chapter 13:
  - let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
  - let v2: Vec<_> = v1.into_iter().filter(|x| x < 42).collect();
- sharing between threads: Box<...> to move, Arc<RwLock<...>> to write once
and read in parallel
--->

- Objective-C Programming

  - [The Objective-C Programming Language](http://andrewd.ces.clemson.edu/courses/cpsc102/notes/ObjC.pdf)

- Go Programming

  - [The Go Programming Language](https://www.gopl.io/)

- Android programming

  - [Professional Android, 4th Edition](https://www.oreilly.com/library/view/professional-android-4th/9781118949528/) (2018)

  * [Dmitry Jemerov, Svetlana Isakova: Kotlin in Action](https://books.google.hu/books?id=qtcIkAEACAAJ) (2017)
