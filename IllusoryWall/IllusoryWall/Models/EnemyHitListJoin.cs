namespace IllusoryWall.Models
{
    public class EnemyHitListJoin
    {
        public int EnemyId { get; set; }
        public virtual Enemy Enemy { get; set; }
        public int HitListId { get; set; }
        public virtual HitList HitList { get; set; }
    }
}
