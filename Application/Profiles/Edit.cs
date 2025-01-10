using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Profile Profile { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Profile).SetValidator(new ProfileValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                user.DisplayName = request.Profile.DisplayName ?? user.DisplayName;
                user.Bio = request.Profile.Bio ?? user.Bio;

                _context.Entry(user).State = EntityState.Modified;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update profile");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}