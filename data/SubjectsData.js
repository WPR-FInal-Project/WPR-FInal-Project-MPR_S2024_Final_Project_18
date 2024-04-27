const subjectData = {
  primarySchool: {
    subjects: [
      {
        name: "Mathematics",
        questions: [
          {
            question: "1 + 1 equals 2.",
            answer: true
          },
          {
            question: "5 * 5 equals 25.",
            answer: false
          },
          {
            question: "The sum of the angles in a triangle is 180 degrees.",
            answer: true
          },
          {
            question: "Multiplying any number by 0 results in 0.",
            answer: true
          },
          {
            question: "Subtracting a number from itself results in 0.",
            answer: true
          },
          // Add more questions as needed
        ]
      },
      {
        name: "Science",
        questions: [
          {
            question: "Water boils at 100 degrees Celsius.",
            answer: true
          },
          {
            question: "The Earth revolves around the Sun.",
            answer: true
          },
          {
            question: "Plants require sunlight to perform photosynthesis.",
            answer: true
          },
          {
            question: "All metals are magnetic.",
            answer: false
          },
          {
            question: "Sound cannot travel through a vacuum.",
            answer: true
          },
          // Add more questions as needed
        ]
      },
      // Add more subjects for primary school
    ]
  },
  secondarySchool: {
    subjects: [
      {
        name: "Physics",
        questions: [
          {
            question: "Acceleration due to gravity on Earth is approximately 9.8 m/s^2.",
            answer: true
          },
          {
            question: "Newton's first law of motion states that an object at rest will remain at rest unless acted upon by an external force.",
            answer: true
          },
          {
            question: "Light travels faster than sound.",
            answer: true
          },
          {
            question: "Friction always opposes the motion of an object.",
            answer: true
          },
          {
            question: "Momentum is conserved in a closed system.",
            answer: true
          },
          // Add more questions as needed
        ]
      },
      // Add more subjects for secondary school
    ]
  },
  highSchool: {
    subjects: [
      {
        name: "Chemistry",
        questions: [
          {
            question: "The atomic number of oxygen is 8.",
            answer: true
          },
          {
            question: "The formula for water is H2O.",
            answer: true
          },
          {
            question: "Acids have a pH less than 7.",
            answer: true
          },
          {
            question: "All substances expand when heated.",
            answer: false
          },
          {
            question: "A catalyst increases the rate of a chemical reaction without being consumed.",
            answer: true
          },
          // Add more questions as needed
        ]
      },
      // Add more subjects for high school
    ]
  }
};

module.exports = subjectData;
