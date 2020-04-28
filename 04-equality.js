// == -> allows coercion (types different)
// === -> disallows coercion (types same)

// Coercive equality prefers numeric comparison

// Avoid:
// == with 0 or "" (or even " ")
// == with non-primitives
// == true or == false (allow ToBoolean or use ===)

// The case for preferring ==
// if you know the types
