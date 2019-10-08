using System;
using System.Drawing;

namespace TodoApiHelper {
    public class LevenshteinCalculator {
        public static int LevenshteinDistance(string baseStr, string compareStr, bool ignoreCase) {
            if (baseStr.Length == 0 || compareStr.Length == 0) {
                return 0;
            }

            if (ignoreCase) {
                baseStr = baseStr.ToLower();
                compareStr = compareStr.ToLower();
            }


            var compareMatrix = new int[baseStr.Length + 1, compareStr.Length + 1];
            for (var i = 0; i <= baseStr.Length; compareMatrix[i, 0] = i++) { }
            for (var j = 0; j <= compareStr.Length; compareMatrix[0, j] = j++) { }

            int baseLength = baseStr.Length;
            int compareLength = compareStr.Length;

            for (int x = 1; x <= baseLength; x++) {

                for (int y = 1; y <= compareLength; y++) {
                    int cost = baseStr[x - 1] == compareStr[y - 1] ? 0 : 1;

                    compareMatrix[x, y] = Math.Min(
                        compareMatrix[x - 1, y - 1] + cost,
                        Math.Min(compareMatrix[x - 1, y] + 1, compareMatrix[x, y - 1] + 1)
                    );
                    int koll = compareMatrix[x, y];

                }
            }

            for (int x = 0; x < baseLength + 1; x++) {
                for (int j = 0; j < compareLength + 1; j++) {

                }
            }

            // printTwoDimensionalArray(compareMatrix);
            return compareMatrix[baseLength, compareLength];
        }
        public static void printTwoDimensionalArray(int[, ] arr) {

            int rowLength = arr.GetLength(0);
            int colLength = arr.GetLength(1);

            for (int i = 0; i < rowLength; i++) {
                for (int j = 0; j < colLength; j++) {
                    Console.Write(string.Format("{0} ", arr[i, j]));
                }
                Console.Write(Environment.NewLine);
            }
        }
    }

}