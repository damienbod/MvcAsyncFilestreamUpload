using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using MvcAsyncFilestreamUpload.Models;

namespace MvcAsyncFilestreamUpload.Controllers
{
    public class HomeController : Controller
    {
        public static List<DocumentModel> Docs = new List<DocumentModel>();
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetFileAsync(int id)
        {
            // get your file from the database asnyc...
            return View();
        }

        public FileUploadJsonResult AjaxUpload(HttpPostedFileBase file, UploadModel model)
        {
            if (file != null && !string.IsNullOrEmpty(file.FileName))
            {
                // here you can save your file to the database...
                var doc = new DocumentModel
                    {
                        Id = Docs.Count+ 1,
                        DocumentName = file.FileName,
                        RecievedDate = DateTime.Now,
                        UploadDate = DateTime.Now
                    };
                Docs.Add(doc);
            }

            if (file == null) return new FileUploadJsonResult { Data = new { message = "FileUploadJsonResultMessage" } };

            return new FileUploadJsonResult { Data = new { message = System.IO.Path.GetFileName(file.FileName) + "FileUploadJsonResultMessageSuccess" } };
        }

        public ActionResult UploadForm()
        {
            var model = new UploadModel();
            model.Documents = Docs;
            // get you file headers from the database

            return PartialView("UploadForm", model);
        }
    }
}
