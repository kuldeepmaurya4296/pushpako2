import { X, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';

export default function ViewTeamDialog({ isOpen, onClose, member }) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Team Member Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <img
              src={member.image || '/placeholder-avatar.png'}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-blue-400 font-medium">{member.position}</p>
              <p className="text-gray-400">{member.department}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white">{member.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white">{member.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Join Date</p>
                <p className="text-white">{member.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Biography</h4>
            <p className="text-gray-300 leading-relaxed">{member.bio}</p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Experience</h4>
            <p className="text-gray-300">{member.experience} years</p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {member.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {member.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {member.socialLinks && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Social Links</h4>
              <div className="flex gap-4">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    LinkedIn
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Twitter
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}