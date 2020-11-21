namespace IllusoryWall.Models {
    public class EnemyHitlist {
        public int EnemyId { get; set; }
        public Enemy Enemy { get; set; }
        public int HitlistId { get; set; }
        public HitList HitList { get; set; }
    }
}
