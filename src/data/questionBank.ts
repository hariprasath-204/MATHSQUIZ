export interface Question {
  id: string;
  unit: 3 | 4 | 5;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  points: number;
  explanation: string;
}

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // UNIT 3: TREES (15 QUESTIONS)
  // ==========================================
  {
    id: "u3_q01",
    unit: 3,
    topic: "Properties of Trees",
    question: "A connected undirected graph with n vertices is a tree if and only if it contains how many edges?",
    options: ["n edges", "n - 1 edges", "n + 1 edges", "2n - 1 edges"],
    correctIndex: 1,
    points: 10,
    explanation: "A fundamental property of any tree with n vertices is that it is acyclic and connected with exactly n - 1 edges."
  },
  {
    id: "u3_q02",
    unit: 3,
    topic: "Rooted Trees & m-ary Trees",
    question: "In a full m-ary tree with i internal vertices, what is the total number of vertices (n)?",
    options: ["n = m * i", "n = m * i + 1", "n = (m - 1) * i + 1", "n = m * (i + 1)"],
    correctIndex: 1,
    points: 10,
    explanation: "Each of the i internal vertices has m children, contributing m*i vertices plus the 1 root vertex, giving n = m*i + 1."
  },
  {
    id: "u3_q03",
    unit: 3,
    topic: "Saturated Hydrocarbons and Trees",
    question: "Saturated hydrocarbons (alkanes) with n carbon atoms are represented as trees with chemical formula:",
    options: ["C_n H_2n", "C_n H_(2n+2)", "C_n H_(2n-2)", "C_n H_(n+2)"],
    correctIndex: 1,
    points: 10,
    explanation: "Saturated hydrocarbons (alkanes) correspond to trees where carbon has degree 4 and hydrogen has degree 1, satisfying C_n H_(2n+2)."
  },
  {
    id: "u3_q04",
    unit: 3,
    topic: "Tree-Connected Parallel Processors",
    question: "In a tree-connected network of parallel processors with N processors organized as a complete binary tree, what is the communication diameter?",
    options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"],
    correctIndex: 1,
    points: 10,
    explanation: "The maximum distance between any two processors in a complete binary tree of N nodes is proportional to twice its height, which is O(log N)."
  },
  {
    id: "u3_q05",
    unit: 3,
    topic: "Computer File Systems",
    question: "In a hierarchical computer file system modeled as a rooted tree, what do the internal vertices and leaves typically represent?",
    options: [
      "Internal vertices = Files, Leaves = Directories",
      "Internal vertices = Directories, Leaves = Files or empty directories",
      "Internal vertices = Root disk, Leaves = RAM addresses",
      "Internal vertices = Shortcuts, Leaves = File extensions"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "File system directory trees have directory folders as internal vertices (branches) and data files or empty folders as terminal leaves."
  },
  {
    id: "u3_q06",
    unit: 3,
    topic: "Binary Search Tree (BST)",
    question: "In a Binary Search Tree (BST), for every vertex v, the keys in its left subtree are:",
    options: [
      "Greater than the key at v",
      "Less than the key at v",
      "Equal to the key at v",
      "Alternating in parity with key at v"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "By the BST property, all keys in the left subtree of v are strictly less than the key at v, and keys in the right subtree are greater."
  },
  {
    id: "u3_q07",
    unit: 3,
    topic: "Decision Trees & Sorting Complexity",
    question: "A decision tree that sorts n distinct elements using binary comparisons has at least n! leaves. Its height is lower bounded by:",
    options: ["Ω(n)", "Ω(n log n)", "Ω(n^2)", "Ω(log n)"],
    correctIndex: 1,
    points: 10,
    explanation: "Since there are n! permutations (leaves), the height h >= log_2(n!) = Ω(n log n) by Stirling's approximation, establishing the comparison sort lower bound."
  },
  {
    id: "u3_q08",
    unit: 3,
    topic: "Prefix Codes",
    question: "A code is called a prefix code if and only if:",
    options: [
      "All codewords have the exact same length",
      "No codeword is a prefix of any other codeword",
      "Codewords always begin with a '0'",
      "The code uses only ternary symbols"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "Prefix codes guarantee instantaneous, uniquely decodable transmission because no codeword appears as an initial segment (prefix) of another."
  },
  {
    id: "u3_q09",
    unit: 3,
    topic: "Huffman Coding",
    question: "Huffman coding is an optimal algorithm designed to construct prefix codes based on which algorithmic paradigm?",
    options: ["Dynamic Programming", "Greedy Algorithm", "Divide and Conquer", "Backtracking"],
    correctIndex: 1,
    points: 10,
    explanation: "Huffman's algorithm repeatedly merges the two lowest-frequency tree nodes in a greedy fashion to produce an optimal prefix tree."
  },
  {
    id: "u3_q10",
    unit: 3,
    topic: "Game Trees",
    question: "In a game tree for two-player sequential games like Tic-Tac-Toe, internal vertices at even and odd levels alternate between:",
    options: [
      "Chance nodes and terminal nodes",
      "Maximizing player's moves and Minimizing player's moves",
      "Heuristic scoring and random dice rolls",
      "Root nodes and leaf nodes"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "Game trees use the Minimax principle, where alternating levels represent moves for the maximizing player and minimizing opponent."
  },
  {
    id: "u3_q11",
    unit: 3,
    topic: "Nim Game Trees",
    question: "In the combinatorial game of Nim, a position with pile sizes (x1, x2, ..., xk) is a winning position for the next player if and only if:",
    options: [
      "The sum x1 + x2 + ... + xk is even",
      "The XOR sum (nim-sum) x1 ⊕ x2 ⊕ ... ⊕ xk ≠ 0",
      "The product of pile sizes is a prime number",
      "All pile sizes are distinct powers of 2"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "By the Bouton analysis of Nim, a state is a P-position (losing) when nim-sum = 0, and an N-position (winning) when nim-sum ≠ 0."
  },
  {
    id: "u3_q12",
    unit: 3,
    topic: "Tic-Tac-Toe Complexity",
    question: "A complete game tree for Tic-Tac-Toe starting from an empty 3x3 board has at most how many root children (initial moves)?",
    options: ["3 moves", "9 moves (reduced to 3 by rotational symmetry)", "27 moves", "81 moves"],
    correctIndex: 1,
    points: 10,
    explanation: "The first player can choose any of the 9 empty cells, which reduce to 3 unique strategic opening moves (corner, edge, center) due to symmetry."
  },
  {
    id: "u3_q13",
    unit: 3,
    topic: "Ordered Rooted Trees",
    question: "In an ordered rooted tree, how are the children of each internal vertex specified?",
    options: [
      "In order of increasing degree",
      "In a definite order, usually drawn left to right",
      "Randomly at each level",
      "By ascending alphanumeric label only"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "An ordered rooted tree fixes a linear order for the children of each internal vertex, typically rendered from left to right."
  },
  {
    id: "u3_q14",
    unit: 3,
    topic: "Spanning Trees",
    question: "A spanning tree of a connected, undirected graph G is a subgraph that:",
    options: [
      "Is a tree containing every vertex of G",
      "Contains every edge of G and no vertices",
      "Has exactly the same cycles as G",
      "Is disconnected into two equal trees"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "A spanning tree of G is a subgraph that is a tree and includes every single vertex of G."
  },
  {
    id: "u3_q15",
    unit: 3,
    topic: "Leaves in m-ary Tree",
    question: "In a full m-ary tree with i internal vertices, the number of leaves L is given by:",
    options: ["L = (m - 1) * i + 1", "L = m * i - 1", "L = i / m + 1", "L = m * (i - 1)"],
    correctIndex: 0,
    points: 10,
    explanation: "Since total vertices n = m*i + 1 and n = i + L, we have i + L = m*i + 1, which gives L = (m - 1)*i + 1."
  },

  // ==========================================
  // UNIT 4: BOOLEAN ALGEBRA (15 QUESTIONS)
  // ==========================================
  {
    id: "u4_q01",
    unit: 4,
    topic: "Duality Principle",
    question: "According to the Duality Principle in Boolean Algebra, the dual of an identity is obtained by:",
    options: [
      "Replacing + with •, • with +, 0 with 1, and 1 with 0",
      "Negating all variables while keeping operators unchanged",
      "Replacing all variables with 0 and constants with 1",
      "Swapping the left-hand and right-hand sides of the equation"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "The dual of any Boolean expression is formed by swapping Boolean sums (+) and products (•), and interchanging identity elements 0 and 1."
  },
  {
    id: "u4_q02",
    unit: 4,
    topic: "De Morgan's Laws",
    question: "Which of the following represents De Morgan's Law for Boolean Algebra?",
    options: [
      "¬(x ∧ y) = ¬x ∧ ¬y",
      "¬(x ∨ y) = ¬x ∧ ¬y and ¬(x ∧ y) = ¬x ∨ ¬y",
      "x ∨ (y ∧ z) = (x ∨ y) ∧ z",
      "x ∧ (x ∨ y) = y"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "De Morgan's laws state that the complement of a sum is the product of complements, and the complement of a product is the sum of complements."
  },
  {
    id: "u4_q03",
    unit: 4,
    topic: "Sum-of-Products (SOP)",
    question: "In Boolean algebra, a minterm of n Boolean variables is a Boolean product that:",
    options: [
      "Contains each of the n variables in either complemented or uncomplemented form",
      "Contains at least one 0 and at least one 1",
      "Is always equal to 0 for all input assignments",
      "Contains only the sum of uncomplemented variables"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "A minterm (or Boolean product term) of n variables y1, ..., yn is a product containing each variable y_i exactly once (as y_i or y_i')."
  },
  {
    id: "u4_q04",
    unit: 4,
    topic: "Product-of-Sums (POS)",
    question: "The Product-of-Sums (POS) expansion of a Boolean function is also known as its:",
    options: [
      "Disjunctive Normal Form (DNF)",
      "Conjunctive Normal Form (CNF)",
      "Minterm Expansion",
      "Reed-Muller Expansion"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "The Product-of-Sums (POS) representation, formed by the conjunction of maxterms, is called the Conjunctive Normal Form (CNF)."
  },
  {
    id: "u4_q05",
    unit: 4,
    topic: "Functional Completeness",
    question: "Which single logic gate is functionally complete on its own?",
    options: ["AND gate", "OR gate", "NAND gate", "XOR gate"],
    correctIndex: 2,
    points: 10,
    explanation: "Both NAND and NOR are universal gates; any Boolean function can be expressed using only NAND gates (or only NOR gates)."
  },
  {
    id: "u4_q06",
    unit: 4,
    topic: "Functional Completeness Sets",
    question: "Which of the following sets of Boolean operators is functionally complete?",
    options: ["{AND, OR}", "{OR, TRUE}", "{AND, NOT}", "{XOR, IDENTITY}"],
    correctIndex: 2,
    points: 10,
    explanation: "The set {AND, NOT} is functionally complete because OR can be synthesized via De Morgan's Law: x + y = (x' • y')'."
  },
  {
    id: "u4_q07",
    unit: 4,
    topic: "Absorption Law",
    question: "What is the simplified form of the Boolean expression x + x•y?",
    options: ["x • y", "x", "y", "1 + x"],
    correctIndex: 1,
    points: 10,
    explanation: "By the Absorption Law of Boolean Algebra, x + x•y = x•(1 + y) = x•1 = x."
  },
  {
    id: "u4_q08",
    unit: 4,
    topic: "Karnaugh Maps (K-maps)",
    question: "In a Karnaugh map (K-map), adjacent cells differ by how many bit positions?",
    options: ["0 bits", "Exactly 1 bit (Gray Code ordering)", "2 bits", "Arbitrary bits"],
    correctIndex: 1,
    points: 10,
    explanation: "K-map row and column indices follow Gray Code ordering (00, 01, 11, 10), ensuring adjacent cells differ by exactly one literal."
  },
  {
    id: "u4_q09",
    unit: 4,
    topic: "K-map Cell Count",
    question: "A Karnaugh map for a Boolean function of 4 variables contains how many cells?",
    options: ["8 cells", "12 cells", "16 cells", "32 cells"],
    correctIndex: 2,
    points: 10,
    explanation: "For n variables, the number of minterm cells in a K-map is 2^n. For 4 variables, 2^4 = 16 cells (arranged in a 4x4 grid)."
  },
  {
    id: "u4_q10",
    unit: 4,
    topic: "Don't-Care Conditions",
    question: "How are 'don't-care' conditions (denoted by 'd' or 'X') utilized during K-map simplification?",
    options: [
      "They must always be assigned the value 0",
      "They must always be assigned the value 1",
      "They can be chosen as 1 or 0 to form larger groups and simplify terms",
      "They are strictly excluded from all grouping"
    ],
    correctIndex: 2,
    points: 10,
    explanation: "Don't care terms represent unreachable input states; they can be treated as 1 if it allows creating a larger group (reducing literals) or 0 otherwise."
  },
  {
    id: "u4_q11",
    unit: 4,
    topic: "Quine-McCluskey Method",
    question: "The Quine-McCluskey method is preferred over Karnaugh maps when:",
    options: [
      "The function has only 2 variables",
      "The number of variables exceeds 5 or 6, making manual geometric K-maps impractical",
      "The circuit contains only XOR gates",
      "No minterms evaluate to 1"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "The Quine-McCluskey tabular method is algorithmic and easily automated in software for functions with 6 or more variables where K-maps fail."
  },
  {
    id: "u4_q12",
    unit: 4,
    topic: "Prime Implicants",
    question: "In Boolean minimization, a prime implicant is defined as:",
    options: [
      "A product term obtained by combining the maximum possible number of adjacent minterms",
      "A term that only contains uncomplemented variables",
      "Any minterm with an odd number of 1s",
      "A single isolated cell in the K-map"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "A prime implicant is an implicant (product term) that cannot be combined with any other implicant to eliminate further literals."
  },
  {
    id: "u4_q13",
    unit: 4,
    topic: "Essential Prime Implicants",
    question: "What distinguishes an 'Essential Prime Implicant' from an ordinary prime implicant?",
    options: [
      "It contains at least one minterm that is covered by no other prime implicant",
      "It covers all 2^n minterms simultaneously",
      "It is always composed of 3 literals",
      "It corresponds to the don't-care cells only"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "An essential prime implicant must be included in the minimal SOP expansion because it uniquely covers at least one minterm that no other prime implicant covers."
  },
  {
    id: "u4_q14",
    unit: 4,
    topic: "Boolean Algebra Idempotent Law",
    question: "Which of the following equations represents the Idempotent Law in Boolean algebra?",
    options: ["x + x = x and x • x = x", "x + 0 = x and x • 1 = x", "x + x' = 1", "x • (y • z) = (x • y) • z"],
    correctIndex: 0,
    points: 10,
    explanation: "The idempotent law states that combining a variable with itself under addition or multiplication yields the variable itself: x + x = x and x • x = x."
  },
  {
    id: "u4_q15",
    unit: 4,
    topic: "Boolean Circuit Minimization",
    question: "What is the primary objective of Boolean circuit minimization?",
    options: [
      "Reducing the number of gates and gate inputs to lower cost, delay, and power",
      "Maximizing the number of wires in the PCB",
      "Converting all gates into XOR equivalents only",
      "Ensuring that all paths have unequal propagation delays"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "Circuit minimization aims to find an equivalent logic circuit with minimum gate count and minimal gate fan-in, minimizing silicon area and propagation delay."
  },

  // ==========================================
  // UNIT 5: ALGEBRAIC STRUCTURES (15 QUESTIONS)
  // ==========================================
  {
    id: "u5_q01",
    unit: 5,
    topic: "Semigroups & Monoids",
    question: "An algebraic structure (S, *) is called a Monoid if it satisfies which conditions?",
    options: [
      "Closure and Associativity only",
      "Closure, Associativity, and Existence of an Identity element",
      "Closure, Associativity, Identity, and Inverses for all elements",
      "Commutativity and Distributivity only"
    ],
    correctIndex: 1,
    points: 10,
    explanation: "A semigroup is closed and associative. A monoid is a semigroup with an identity element e such that a*e = e*a = a."
  },
  {
    id: "u5_q02",
    unit: 5,
    topic: "Definition of a Group",
    question: "A group (G, *) must satisfy four fundamental properties: Closure, Associativity, Identity, and:",
    options: ["Commutativity", "Existence of Inverse for every element", "Distributivity", "Idempotence"],
    correctIndex: 1,
    points: 10,
    explanation: "A group is a monoid in which every element a in G has an inverse a^(-1) in G such that a * a^(-1) = a^(-1) * a = e."
  },
  {
    id: "u5_q03",
    unit: 5,
    topic: "Abelian Group",
    question: "A group (G, *) is called an Abelian (or commutative) group if for all a, b in G:",
    options: ["a * b = b * a", "a * b = e", "a * a = b * b", "(a * b)^(-1) = a^(-1) * b^(-1) without swapping"],
    correctIndex: 0,
    points: 10,
    explanation: "An Abelian group is a group that satisfies the commutative law: a * b = b * a for all elements a, b in G."
  },
  {
    id: "u5_q04",
    unit: 5,
    topic: "Subgroup Criterion",
    question: "A non-empty subset H of a group G is a subgroup of G if and only if for all a, b in H:",
    options: ["a * b^(-1) ∈ H", "a * b = e", "a + b ∈ H", "|H| = |G|"],
    correctIndex: 0,
    points: 10,
    explanation: "The One-Step Subgroup Test states that H <= G iff H is non-empty and for all a, b in H, the element a * b^(-1) belongs to H."
  },
  {
    id: "u5_q05",
    unit: 5,
    topic: "Order of Group Elements",
    question: "The order of an element 'a' in a group G is defined as:",
    options: [
      "The smallest positive integer n such that a^n = e (identity)",
      "The total number of elements in group G",
      "The number of generators in G",
      "The index of the subgroup generated by a"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "The order of an element a, denoted o(a), is the smallest positive integer n such that a^n = e. If no such n exists, it has infinite order."
  },
  {
    id: "u5_q06",
    unit: 5,
    topic: "Cyclic Groups & Generators",
    question: "A group G is cyclic if every element x in G can be written as a^k for some fixed generator 'a'. How many generators does (Z_6, +_6) have?",
    options: ["1 (element 0)", "2 (elements 1 and 5)", "3 (elements 2, 3, 4)", "6 (all elements)"],
    correctIndex: 1,
    points: 10,
    explanation: "For (Z_n, +), the generators are the integers k such that gcd(k, n) = 1. For n=6, gcd(k, 6)=1 for k = 1 and 5, giving φ(6) = 2 generators."
  },
  {
    id: "u5_q07",
    unit: 5,
    topic: "Lagrange's Theorem",
    question: "Lagrange's Theorem states that for any finite group G and any subgroup H of G:",
    options: [
      "The order of H divides the order of G (|G| / |H| is an integer)",
      "|H| is always a prime number",
      "|G| = |H|^2",
      "H is always an Abelian group"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "Lagrange's Theorem is a cornerstone of abstract algebra: the order (size) of every subgroup H divides the order of the finite group G."
  },
  {
    id: "u5_q08",
    unit: 5,
    topic: "Cosets of a Subgroup",
    question: "If H is a subgroup of G, the left coset of H containing 'a' is defined as:",
    options: ["aH = { a * h | h ∈ H }", "Ha = { h * a | h ∈ H }", "aH = { h^(-1) * a | h ∈ H }", "aH = { a + h | h ∉ H }"],
    correctIndex: 0,
    points: 10,
    explanation: "The left coset aH is formed by multiplying every element h in H on the left by element a: aH = { a * h : h in H }."
  },
  {
    id: "u5_q09",
    unit: 5,
    topic: "Group Isomorphism",
    question: "A group homomorphism f: (G, *) -> (G', •) is an Isomorphism if and only if f is:",
    options: ["Injective only", "Surjective only", "Bijective (one-to-one and onto)", "Constant"],
    correctIndex: 2,
    points: 10,
    explanation: "An isomorphism is a bijective homomorphism. It establishes that G and G' share identical algebraic structure under a 1-to-1 correspondence."
  },
  {
    id: "u5_q10",
    unit: 5,
    topic: "Automorphism",
    question: "An automorphism of a group G is an isomorphism from:",
    options: ["G to its quotient group G/H", "G onto G itself (f: G -> G)", "G to the real numbers (R, +)", "G to its symmetric group S_n"],
    correctIndex: 1,
    points: 10,
    explanation: "An automorphism is an isomorphism of a group onto itself, mapping elements within G while preserving the group operation."
  },
  {
    id: "u5_q11",
    unit: 5,
    topic: "Permutation Groups (Symmetric Group S_n)",
    question: "The symmetric group S_n consisting of all permutations of n distinct symbols has order (number of elements) equal to:",
    options: ["2^n", "n!", "n^2", "n(n - 1) / 2"],
    correctIndex: 1,
    points: 10,
    explanation: "There are n! possible bijections from a set of n elements to itself; hence |S_n| = n!."
  },
  {
    id: "u5_q12",
    unit: 5,
    topic: "Transpositions",
    question: "A cycle of length 2 in a permutation group is called a:",
    options: ["Transposition", "Involution", "Homomorphism", "Fixed point"],
    correctIndex: 0,
    points: 10,
    explanation: "A cycle of length 2, written as (i j), swaps elements i and j while leaving all other elements fixed, and is known as a transposition."
  },
  {
    id: "u5_q13",
    unit: 5,
    topic: "Even and Odd Permutations",
    question: "A permutation is defined as 'Even' if it can be expressed as the product of:",
    options: [
      "An even number of transpositions",
      "An odd number of transpositions",
      "Only 2-cycles with even indices",
      "Even powers of the identity permutation"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "Every permutation can be factored into 2-cycles (transpositions); a permutation is even (sign = +1) if it is the product of an even number of transpositions."
  },
  {
    id: "u5_q14",
    unit: 5,
    topic: "Alternating Group A_n",
    question: "The set of all even permutations on n elements forms the Alternating Group A_n. What is the order of A_n for n >= 2?",
    options: ["n! / 2", "n!", "2^(n - 1)", "(n - 1)!"],
    correctIndex: 0,
    points: 10,
    explanation: "Exactly half of the permutations in S_n are even and half are odd. Thus, the alternating group A_n has order |A_n| = n! / 2."
  },
  {
    id: "u5_q15",
    unit: 5,
    topic: "Subalgebra",
    question: "A subset S' of an algebraic system (S, *) is a Subalgebra if:",
    options: [
      "S' is closed under all algebraic operations defined on S",
      "S' has fewer elements than S",
      "S' does not contain any identity element",
      "S' is isomorphic to the empty set"
    ],
    correctIndex: 0,
    points: 10,
    explanation: "A subalgebra is a subset of an algebraic structure that is closed under all the fundamental operations of the parent structure."
  }
];

export const getQuestionsByUnit = (unit: 3 | 4 | 5): Question[] => {
  return QUESTION_BANK.filter(q => q.unit === unit);
};

export const getRandomQuestions = (unit: 3 | 4 | 5, count: number = 15): Question[] => {
  const unitQuestions = getQuestionsByUnit(unit);
  // Fisher-Yates shuffle
  const shuffled = [...unitQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};
