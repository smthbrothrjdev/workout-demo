import { data } from "../helpers/workout-data";
import { PrismaClient } from "@prisma/client";

type ExerciseList = {
  id: number;
  exercise_name: string;
  videoURL: string[];
  steps: string[];
  Category: string;
  Difficulty: string;
  Force: string;
  Grips: string;
  target: {
    Primary: string[];
    Secondary?: string[];
  };
  youtubeURL: string;
  details: string;
};

const prisma = new PrismaClient();
async function main() {
  for (const item of data as ExerciseList[]) {
    prisma.exercise.create({
      data: {
        //scalar
        name: item.exercise_name,
        details: item.details,
        youtubeUrl: item.youtubeURL,

        //1-n
        category: {
          connect: {
            name: item.Category,
          },
        },
        difficulty: {
          connect: {
            name: item.Difficulty,
          },
        },
        force: {
          connect: {
            name: item.Force,
          },
        },
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
