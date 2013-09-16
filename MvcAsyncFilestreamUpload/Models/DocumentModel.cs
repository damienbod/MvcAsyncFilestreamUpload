using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcAsyncFilestreamUpload.Models
{
    public class DocumentModel
    {
        public int Id { get; set; }

        public string DocumentName { get; set; }

        public DateTime RecievedDate { get; set; }

        public DateTime UploadDate { get; set; }

        public bool IsChecked { get; set; }
    }
}