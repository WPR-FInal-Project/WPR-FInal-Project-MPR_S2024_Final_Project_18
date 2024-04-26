const subjectData = {
    primarySchool: {
      subjects: [
        {
          name: "Mathematics",
          prerequisites: [],
          questions: [
            {
              question: "1 + 1 equals 3.",
              answer: false
            },
            {
              question: "2 + 2 equals 4.",
              answer: true
            },
            // Add more questions as needed
          ]
        },
        {
          name: "Science",
          prerequisites: ["Mathematics"],
          questions: [
            {
              question: "Water freezes at 100 degrees Celsius.",
              answer: false
            },
            {
              question: "Plants need sunlight to photosynthesize.",
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
          prerequisites: ["Mathematics", "Science"],
          questions: [
            {
              question: "Objects fall faster than feathers in a vacuum.",
              answer: true
            },
            {
              question: "Sound travels faster in water than in air.",
              answer: false
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
          prerequisites: ["Mathematics", "Science"],
          questions: [
            {
              question: "Water is composed of two hydrogen atoms and one oxygen atom.",
              answer: true
            },
            {
              question: "Acids have a pH greater than 7.",
              answer: false
            },
            // Add more questions as needed
          ]
        },
        // Add more subjects for high school
      ]
    }
  };
  
  module.exports = subjectData;
  