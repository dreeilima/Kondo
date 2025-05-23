import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  className = "",
}) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted/30 h-full">
      <div className={`p-4 sm:p-6 space-y-6 max-w-none ${className}`}>
        {(title || headerActions) && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {headerActions && (
              <div className="flex flex-col sm:flex-row gap-2">
                {headerActions}
              </div>
            )}
          </div>
        )}

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
