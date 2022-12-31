---
title: Dev toolbox
...

# C++

- Indexing, code completion: [ctags](https://ctags.io/) and
  [YouCompleteMe](http://valloric.github.io/YouCompleteMe/)
- Testing: [cppunit](https://freedesktop.org/wiki/Software/cppunit/) and
  [googletest](https://github.com/google/googletest)
- Documenting: [doxygen](http://www.doxygen.nl/)
- Code formatting: [clang-format](https://clang.llvm.org/docs/ClangFormat.html)
- Static analysis: [clang-tidy](http://clang.llvm.org/extra/clang-tidy/) and
  [IWYU](https://include-what-you-use.org/)
- Dynamic analysis: [valgrind](http://valgrind.org/) and
  [sanitizers](https://github.com/google/sanitizers)
- Build system: [automake](https://www.gnu.org/software/automake/) and
  [cmake](https://cmake.org/)
- Debugging: gdb, Visual Studio

More details:

## C++11

- [LLVM docs](http://llvm.org/docs/CodingStandards.html#supported-c-11-language-and-library-features)

- Features that I saw working with MSVC 2012, GCC 4.8 (ideally >= 4.6) and
  Clang 3.4 (ideally >=3.1):

  - Range-based for-loop
  - Lambdas (but not lambdas with default arguments)
  - `auto` type deduction
  - Strongly-typed and forward declarable enums

## C++17

Features that I saw working in LibreOffice:

- [`std::string_view`](http://cgit.freedesktop.org/libreoffice/core/commit/?id=dac7be50cff94e0c34cdca5ac7e35c19685c40c1)
- [structured bindings](http://cgit.freedesktop.org/libreoffice/core/commit/?id=23e32f46b169bf1ec69266c925dabf7c93ba8109)
- [inline variables](http://cgit.freedesktop.org/libreoffice/core/commit/?id=66ef8ca217680095d8aaae025d82c2cbcd8ec1d2)
- [fallthrough](http://cgit.freedesktop.org/libreoffice/core/commit/?id=6e614489dcf70a812e298e1d84864312d9ac9d23)
- [nodiscard](http://cgit.freedesktop.org/libreoffice/core/commit/?id=a061abd3949f933e93c84f9f67f0700055a054f7)
- [class template argument deduction](http://cgit.freedesktop.org/libreoffice/core/commit/?id=5206992e6e9b22b48cea0a4a7626ee576c66492e)

- deeplinks: [wg21.link](https://wg21.link/)
- html deeplinks: [eel.is](http://eel.is/c++draft/vector.bool)

# Go

- Indexing, code completion: [gotags](https://github.com/jstemmer/gotags) and
  [YouCompleteMe](http://valloric.github.io/YouCompleteMe/)
- Testing: [go test](https://golang.org/pkg/testing/)
- Documenting: [godoc](https://blog.golang.org/godoc-documenting-go-code)
- Code formatting:
  [goimports](https://godoc.org/golang.org/x/tools/cmd/goimports)
- Static analysis: [golint](https://godoc.org/golang.org/x/lint/golint)
- Dynamic analysis: [sanitizers](https://blog.golang.org/race-detector)
- Build system: [gobuild](https://golang.org/pkg/go/build/)
- Debugging: [dlv](https://github.com/go-delve/delve)

# Java

- Indexing, code completion: [ctags](https://ctags.io/) and
  [YouCompleteMe](http://valloric.github.io/YouCompleteMe/)
- Testing: JUnit
- Documenting: Javadoc
- Code formatting: [clang-format](https://clang.llvm.org/docs/ClangFormat.html)
- Static analysis: [PMD](https://pmd.github.io/)
- Build system: [maven](https://maven.apache.org/)
- Deugging: [eclipse](https://www.eclipse.org/)

# Rust

- Indexing, code completion: [rusty-tags](https://github.com/dan-t/rusty-tags)
  and [YouCompleteMe](http://valloric.github.io/YouCompleteMe/)
- Testing: [cargo-test](https://doc.rust-lang.org/cargo/guide/tests.html)
- Documenting: [rustdoc](https://doc.rust-lang.org/rustdoc/)
- Code formatting: [rustfmt](https://github.com/rust-lang/rustfmt)
- Static analysis: [rust-clippy](https://github.com/rust-lang/rust-clippy)
- Dynamic analysis: [valgrind](https://creativcoder.github.io/post/checking_memory_leaks_in_rust_ffi/) and
  [sanitizers](https://github.com/japaric/rust-san) (though usually neither of these are needed)
- Build system:
  [cargo-build](https://doc.rust-lang.org/cargo/reference/build-scripts.html)
- Debugging: rust-gdb
