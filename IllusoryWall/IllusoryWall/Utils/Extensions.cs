using System;
using System.Collections.Generic;
using System.Linq;

namespace IllusoryWall.Utils {
    public static class Extensions {
        private static Random rng = new Random();

        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> enumerable) {
            var list = enumerable.ToList();

            int n = list.Count;
            while (n > 1) {
                n--;
                int k = Extensions.rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
            return list;
        }
    }
}
