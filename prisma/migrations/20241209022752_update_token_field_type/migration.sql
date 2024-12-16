-- AlterTable
ALTER TABLE `sys_auth` MODIFY `token` TEXT NOT NULL,
    MODIFY `refresh_token` TEXT NOT NULL;
