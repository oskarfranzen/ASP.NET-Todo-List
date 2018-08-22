using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace TodoApi.Models {

    public enum TodoPriority{
        Standard = 1,
        Important = 2,
        Critical = 3
    }


    public class TodoItem {
        public long Id { get; set; }
        public TodoPriority Priority {get; set;}
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public Alert Alert {get; set;}
    }

    public struct Alert {
        public DateTime TimeOfAlert {get; set;} 
        public Color AlertColor { get; set; }           
        public string RGBColor {
            get {
                return $"{AlertColor.A.ToString() ?? "255"}, {AlertColor.G.ToString() ?? "255"}, {AlertColor.B.ToString() ?? "255"}";
            }
        }

    }
}

