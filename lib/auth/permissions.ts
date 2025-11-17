/*export function canViewJob(user, job) {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'customer' && job.customerId === user.id) return true;
    if (user.role === 'project_manager' && job.assignedTo === user.id) return true;
    return false;
  }
  
  export function canEditJob(user, job) {
    // admin or assigned project manager
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'project_manager' && job.assignedTo === user.id) return true;
    return false;
  }
  */