using System;
using Core.Queries;
using Enterprise.Facilities.Projections;

namespace Enterprise.Facilities.Queries.GetFacilityOfferReport
{
    public record GetFacilityOfferReportQuery(
        Guid FacilityId
    ) : IQuery<FacilityOfferReport>;
}
