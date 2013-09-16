using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MvcAsyncFilestreamUpload.Models
{
    public class UploadModel
    {
        public IEnumerable<DocumentModel> Documents { get; set; }

        [DataType(DataType.Date)]
        public DateTime Erhaltendatum { get; set; }
    }

    
}