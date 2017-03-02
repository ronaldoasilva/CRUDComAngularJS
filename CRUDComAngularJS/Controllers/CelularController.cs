using CRUDComAngularJS.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CRUDComAngularJS.Controllers
{
    [RoutePrefix("api/v1/public")]
    public class CelularController : ApiController
    {
        private readonly CelularDBContext _db = new CelularDBContext();

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                _db.Dispose();

            base.Dispose(disposing);
        }

        [HttpGet]
        [Route("celulares")]
        public IQueryable<Celular> ObterCelulares()
        {
            return _db.Celulares;
        }

        [HttpGet]
        [Route("celular/{id:int}")]
        public HttpResponseMessage ObterPorId(int id)
        {
            try
            {
                if (id <= 0)
                    return Request.CreateResponse(HttpStatusCode.BadRequest);

                Celular celular = _db.Celulares.Find(id);

                return Request.CreateResponse(HttpStatusCode.OK, celular);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("putcelular")]
        public HttpResponseMessage Alterar(Celular celular)
        {
            try
            {
                if (celular == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest);

                _db.Entry(celular).State = EntityState.Modified;
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("postcelular")]
        public HttpResponseMessage Incluir(Celular celular)
        {
            try
            {
                if (celular == null)
                    return Request.CreateResponse(HttpStatusCode.BadRequest);

                _db.Celulares.Add(celular);
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("deletecelular/{id:int}")]
        public HttpResponseMessage Excluir(int id)
        {
            try
            {
                if (id <= 0)
                    return Request.CreateResponse(HttpStatusCode.BadRequest);

                Celular celular = _db.Celulares.Find(id);
                _db.Celulares.Remove(celular);
                _db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
