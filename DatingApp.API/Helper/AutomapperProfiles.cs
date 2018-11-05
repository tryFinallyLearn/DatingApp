using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System.Linq;

namespace DatingApp.API.Helper
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });

            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt =>
               {
                   opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url);
               }).ForMember(dest => dest.Age, opt =>
               {
                   opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
               });

            CreateMap<Photo, PhotosForDetaildDto>();
        }
    }
}