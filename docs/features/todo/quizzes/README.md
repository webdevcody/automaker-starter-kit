# Quizzes Epic

## Overview

This epic contains all features related to quizzes and assessments. Students can take quizzes, and the system can auto-grade them.

## Features (8 total)

- **66**: Create quiz table schema
- **67**: Create quiz_question table schema
- **68**: Create quiz_answer table schema
- **69**: Create quiz_attempt table schema
- **70**: Admin can create quiz
- **71**: Admin can add questions to quiz
- **72**: Student can take quiz
- **73**: Auto-grade quiz and display results

## Implementation Order

1. Start with feature 66 (quiz table)
2. Add question table (67)
3. Add answer table (68)
4. Add attempt table (69)
5. Build quiz creation (70-71)
6. Build quiz taking (72)
7. Build auto-grading (73)

## Dependencies

- Requires Classroom epic (features 29-33) for modules
- Independent epic otherwise
