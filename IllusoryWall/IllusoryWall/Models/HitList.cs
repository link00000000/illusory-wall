using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models {
    public class HitList {
        public int Id { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        public virtual ICollection<Enemy> Enemies { get; set; }

        public bool Status { get; set; }
    }
}
